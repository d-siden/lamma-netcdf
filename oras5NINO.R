library(ncdf4)

# vamos usar rasterVis
#https://oscarperpinan.github.io/rastervis/

arquivo <- nc_open("oras5/sosstsst_control_monthly_highres_2D_196601_CONS_v0.1.nc")

# ver quais variaveis tem no arquivo, os nomes e dimensoes delas
print(arquivo$var)

# carregar a variavel toda
tsm <- ncvar_get(nc = arquivo, varid = "sosstsst")

print(dim(tsm)) # dimensoes da variavel

# carregar variaveis de latitude e longitude
latitudes <- ncvar_get(nc = arquivo, varid = "nav_lat")
longitudes <- ncvar_get(nc = arquivo, varid = "nav_lon")

image(tsm)
