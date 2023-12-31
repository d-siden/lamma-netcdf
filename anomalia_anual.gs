* anomalia do ano

'reinit'

* dados de entrada

* meses individuais
'sdfopen /home/danilo/Documentos/R/nino/era5/TSM_1966_1995.nc'
* nome da var no arquivo = sst

* climatologia 1966 a 1995
'sdfopen /home/danilo/Documentos/R/nino/climatologia_TSM_66-95.nc'
* nome da var tsmclim.2

* criar variavel de saida MEDIA DO ANO
'define anomtsm = sst(time=00z01jan1983)'
'anomtsm = anomtsm + sst(time=00z01feb1983)'
'anomtsm = anomtsm + sst(time=00z01mar1983)'
'anomtsm = anomtsm + sst(time=00z01apr1983)'
'anomtsm = anomtsm + sst(time=00z01may1983)'
'anomtsm = anomtsm + sst(time=00z01jun1983)'
'anomtsm = anomtsm + sst(time=00z01jul1983)'
'anomtsm = anomtsm + sst(time=00z01aug1983)'
'anomtsm = anomtsm + sst(time=00z01sep1983)'
'anomtsm = anomtsm + sst(time=00z01oct1983)'
'anomtsm = anomtsm + sst(time=00z01nov1983)'
'anomtsm = anomtsm + sst(time=00z01dec1983)'
'anomtsm = anomtsm / 12'
'anomtsm = anomtsm - tsmclim.2(t=1)'

* definir atributos e nome do arquivo de saida
'set sdfwrite -4d -rt -flt -nc4 /home/danilo/Documentos/R/nino/anomalia_anual_TSM_1983.nc'
'set sdfattr anomtsm String climatologia 1966-1995'
'set sdfattr anomtsm String ano 1983'

***************************************************************************************
* preencher atributos extras do arquivo conforme necessário 
'set sdfattr anomtsm String name AnomTSM'
'set sdfattr anomtsm String long_name Anomalia da Temperatura da Superficie do Mar'
'set sdfattr anomtsm String unit K'
* escrever arquivo
'sdfwrite anomtsm'

