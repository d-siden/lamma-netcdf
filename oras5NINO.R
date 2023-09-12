rm(list=ls())
library(ncdf4)
library(ggplot2)
library(sf)
library(metR)

# vamos usar rasterVis?
#library(rasterVis)
#https://oscarperpinan.github.io/rastervis/
# vamos usar 'melt' de reshape para transformar matrizes em dataframes

setwd("~/Documentos/R/nino")

# ler shapefiles
continentes <- read_sf(dsn = "shapes/ne_50m_coastline.shp", layer = "ne_50m_coastline")
estados <- read_sf(dsn = "shapes/EstadosBR_IBGE_LLWGS84.shp", layer = "EstadosBR_IBGE_LLWGS84")
lagos <- read_sf(dsn = "shapes/ne_50m_lakes.shp", layer = "ne_50m_lakes")
rios <- read_sf(dsn = "shapes/ne_50m_rivers_lake_centerlines.shp", layer = "ne_50m_rivers_lake_centerlines")

# carregar conversores
source("funcoes/TEMPO_NUM_PARA_CHAR.R")
source("funcoes/LONGITUDE_180.R")

# ler com pacote ncdf4
arquivo <- nc_open("anomalia_TSM_1983.nc")

# ver quais variaveis tem no arquivo, os nomes e dimensoes delas
if(F){
  print(arquivo$var)
  }

# carregar variaveis de latitude e longitude
latitudes <- ncvar_get(nc = arquivo, varid = "lat")
longitudes <- ncvar_get(nc = arquivo, varid = "lon")

# converter as longitudes de 0a360 para -180a+180
longitudes <- LONGITUDE_180(longitudes)
# carregar e converter o tempo
tempo <- TEMPO_NUM_PARA_CHAR(tempos = arquivo$dim$time$vals, unidade = arquivo$dim$time$units)

# plotar com ggplot


# informe área, da esq. pra dir., de baixo pra cima
primeira.lon <- -37
ultima.lon <- -33

primeira.lat <- -12
ultima.lat <- -8

# cores na legenda
numero_de_cores <- 5
rampa_de_cores <- colorRampPalette(c("navyblue", "blue1", "cornflowerblue", "white", "red", "orangered3", "brown4"))

# largura e altura na imagem em polegadas
largura <- 7
altura <- 8#6.6

# transformar valores em índices
i.primeira.lon <- match(primeira.lon, longitudes)
i.ultima.lon <- match(ultima.lon, longitudes)
i.primeira.lat <- match(primeira.lat, latitudes)
i.ultima.lat <- match(ultima.lat, latitudes)
# ATENÇÃÃÃAOOOOO
if(i.primeira.lat>i.ultima.lat){
  print("AVISO: índices de lat em ordem inversa, inverter também ncvar_get e frames")
}
if(i.primeira.lon>i.ultima.lon){
  print("AVISO: índices de lon em ordem inversa, inverter também ncvar_get e frames")
}

for(i.horario in 1:length(tempo)){
  mes <- tempo[i.horario]
  cat("\nMês: ",mes)
  # carregar o setor da variavel
  anomalia <- ncvar_get(nc = arquivo, varid = "anomtsm",
                        start = c(i.primeira.lon, i.primeira.lat, 1, i.horario),
                        count = c(abs(i.primeira.lon-i.ultima.lon)+1, abs(i.primeira.lat-i.ultima.lat)+1, 1, 1),
                        verbose = FALSE)
  
  for (i in 1:dim(anomalia)[1])
  {
    for (j in 1:dim(anomalia)[2])
    {
      if (i==1 && j==1)
      {# Para o primeiro elemento é necessário criar o dataframe.
        # A ordem de acesso/escrita é [i,j]
        # pois i é longitude (eixo horizontal) e
        # j é latitude (eixo vertical).
        # vamos acessar as coordenadas a partir dos indices originais descontado o avanço da iteração
        
        # falta de valores em lat pode indicar necessidade de inversão i.primeira/i.ultima conforme o ''AVISO''
        
        frame.anomalia <- data.frame("lat"=latitudes[i.primeira.lat + j -1],
                                     "lon"=longitudes[i.primeira.lon + i -1],
                                     "tsm"=anomalia[i,j],
                                     stringsAsFactors = FALSE)
      }else{# para os próximos basta adicionar linhas
        nova_linha <- data.frame("lat"=latitudes[i.primeira.lat + j -1],
                                 "lon"=longitudes[i.primeira.lon + i -1],
                                 "tsm"=anomalia[i,j],
                                 stringsAsFactors = FALSE)
        frame.anomalia <- rbind(frame.anomalia, nova_linha)
      }#novalinha
    }#forJ
  }#forI
  
  graphics.off()  # desligar todos os dispositivos gráficos
  
  cat("\nPreparando plot...")
  
  plote <- ggplot()+      # Plot com LC pretas e fundo colorido pela intensidade somente no nivel do jato, e geopotencial somente em 500 hPa
    #geom_sf(data = continentes)+
    geom_sf(data = estados)+
    # geom_sf(data = rios,
    #         color = "turquoise",
    #         linewidth = 1,
    #         show.legend = NA)+
    # geom_sf(data = lagos,
    #         color = "turquoise",
    #         show.legend = NA)+
    metR::geom_contour_fill(data = frame.anomalia,
                            aes(x = lon,
                                y = lat,
                                z = tsm),
                            na.fill = FALSE)+
    scale_fill_gradientn(name = "Anomalia de TSM (K)",
                         colours = rampa_de_cores(numero_de_cores), 
                         limits = c(-4, 4),
                         breaks = c(-4:4))+
    coord_sf(xlim = c(primeira.lon, ultima.lon),
             ylim = c(primeira.lat, ultima.lat),
             crs = sf::st_crs(4326),
             expand = FALSE)+
    scale_x_continuous(breaks = seq(primeira.lon+1, ultima.lon, 1))+
    scale_y_continuous(breaks = seq(primeira.lat, ultima.lat, 1))+
    theme_bw()+
    theme(panel.grid.major = element_blank())+
    theme(legend.position = "bottom",
          legend.key.height = unit(0.4, "cm"),
          legend.key.width = unit(2.7, "cm"),
          legend.title = element_text(size = 9),
          legend.background = element_blank(),
          axis.text = element_text(size = 12, colour = 1),
          axis.text.y = element_text(angle = 90, hjust = 0.5, vjust = 0.5),
          plot.margin = unit(c(0.3, 0.7, 0.3, 0.2), "cm"),
          plot.title = element_text(face = "bold",
                                    hjust = 0.5),)+
    labs(x = "Longitude (°)",
         y = "Latitude (°)")+
    ggtitle(sprintf("Anomalia de Temperatura da Superfície do Mar em %s\n em relação ao período 1966-1995", mes))
  
  # Abrir o arquivo para salvar a imagem
  png(file=sprintf("anomalia_de_TSM_%s.png", mes),
      width=largura,
      height=altura,
      units="in",
      res=300
  )
  print(plote)
  
  # Fechar o dispositivo gráfico
  graphics.off()
  print("Plot salvo!")
  
}



#fechar arquivo
nc_close(arquivo)
