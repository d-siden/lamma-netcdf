* anomalias

'reinit'

* dados de entrada

* meses individuais
'sdfopen /home/danilo/Documentos/R/nino/era5/TSM_1966_1995.nc'
* nome da var no arquivo = sst

* climatologia 1966 a 1995
'sdfopen /home/danilo/Documentos/R/nino/climatologia_TSM_66-95.nc'
* nome da var tsmclim.2

* meses de 1983
'set time 00z01jan1983 00z01dec1983'

* criar variavel de saida
'define anomtsm = sst - tsmclim.2(t=1)'

* definir atributos e nome do arquivo de saida
'set sdfwrite -4d -rt -flt -nc4 /home/danilo/Documentos/R/nino/anomalia_TSM_1983.nc'

'set sdfattr tsmclim String climatologia 1966-1995'

***************************************************************************************
* preencher atributos extras do arquivo conforme necessário 
'set sdfattr tsmclim String name AnomTSM'
'set sdfattr tsmclim String long_name Anomalia da Temperatura da Superficie do Mar'
'set sdfattr tsmclim String unit K'
* escrever arquivo
'sdfwrite anomtsm'

