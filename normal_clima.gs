* preguica de usar o clave do kodama, entao inventei o meu
* se eu estiver errado alguem me corrija, pelo amor de Deus

'reinit'

* dados de entrada
* climatologia de dezembro a fevereiro de 1966 a 1995, dados mensais
'sdfopen /home/danilo/Documentos/R/nino/era5/TSM_1966_1995.nc'
* nome da var no arquivo = sst

'set t 1'
* salvar na variavel: tsmclim
* trimestres: DJF; JFM; FMA; MAM; AMJ; MJJ; JJA; JAS; ASO; SON; OND; NDJ

trimestre = "NDJ"

* definir atributos e nome do arquivo de saida
'set sdfwrite -4d -rt -flt -nc4 /home/danilo/Documentos/R/nino/climatologia_TSM_66-95_'trimestre'.nc'


***********************************************************************************************

* continuar a partir do indice da segunda ocorrencia dos meses
dezemb = 12
janeir = 13
fevere = 14
marco = 15
abril = 16
maio = 17
junho = 18
julho = 19
agosto = 20
setemb = 21
outubr = 22
novemb = 23

********************************DEZEMBRO-JANEIRO-FEVEREIRO**************************************

if (trimestre = "DJF")
say 'Fazer media climatologica de Dez-Jan-Fev'
* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=360)+sst(t=1)+sst(t=2)'
* dezembro=360 marca o fim da serie temporal
while (dezemb < 360)
'set t 'dezemb
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'janeir
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'fevere
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
* avancar para o proximo ano
dezemb = dezemb + 12
janeir = janeir + 12
fevere = fevere + 12
endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String Trimestre DJF'
endif

**********************************JANEIRO-FEVEREIRO-MARCO****************************************

if (trimestre = "JFM")
say 'Fazer media climatologica de Jan-Fev-Mar'
* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=1)+sst(t=2)+sst(t=3)'
* qualquer mes>360 marca o fim da serie temporal
while (janeir < 360)
'set t 'janeir
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'fevere
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'marco
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
* avancar para o proximo ano
janeir = janeir + 12
fevere = fevere + 12
marco = marco + 12
endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String Trimestre JFM'
endif

**********************************FEVEREIRO-MARCO-ABRIL******************************************

if (trimestre = "FMA")
say 'Fazer media climatologica de Fev-Mar-Abr'
* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=2)+sst(t=3)+sst(t=4)'
* qualquer mes>360 marca o fim da serie temporal
while (fevere < 360)
'set t 'fevere
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'marco
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'abril
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
* avancar para o proximo ano
fevere = fevere + 12
marco = marco + 12
abril = abril + 12
endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String Trimestre FMA'
endif

**********************************MARCO-ABRIL-MAIO***********************************************

if (trimestre = "MAM")
say 'Fazer media climatologica de Mar-Abr-Mai'
* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=3)+sst(t=4)+sst(t=5)'
* qualquer mes>360 marca o fim da serie temporal
while (marco < 360)
'set t 'marco
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'abril
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'maio
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
* avancar para o proximo ano
marco = marco + 12
abril = abril + 12
maio = maio + 12
endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String Trimestre MAM'
endif

**********************************ABRIL-MAIO-JUNHO***********************************************

if (trimestre = "AMJ")
say 'Fazer media climatologica de Abr-Mai-Jun'
* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=4)+sst(t=5)+sst(t=6)'
* qualquer mes>360 marca o fim da serie temporal
while (abril < 360)
'set t 'abril
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'maio
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'junho
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
* avancar para o proximo ano
abril = abril + 12
maio = maio + 12
junho = junho + 12
endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String Trimestre AMJ'
endif

**********************************MAIO-JUNHO-JULHO***********************************************

if (trimestre = "MJJ")
say 'Fazer media climatologica de Mai-Jun-Jul'
* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=5)+sst(t=6)+sst(t=7)'
* qualquer mes>360 marca o fim da serie temporal
while (maio < 360)
'set t 'maio
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'junho
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'julho
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
* avancar para o proximo ano
maio = maio + 12
junho = junho + 12
julho = julho + 12
endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String Trimestre MJJ'
endif

**********************************JUNHO-JULHO-AGOSTO********************************************

if (trimestre = "JJA")
say 'Fazer media climatologica de Jun-Jul-Ago'
* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=6)+sst(t=7)+sst(t=8)'
* qualquer mes>360 marca o fim da serie temporal
while (junho < 360)
'set t 'junho
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'julho
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'agosto
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
* avancar para o proximo ano
junho = junho + 12
julho = julho + 12
agosto = agosto + 12
endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String Trimestre JJA'
endif

**********************************JULHO-AGOSTO-SETEMBRO*****************************************

if (trimestre = "JAS")
say 'Fazer media climatologica de Jul-Ago-Set'
* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=7)+sst(t=8)+sst(t=9)'
* qualquer mes>360 marca o fim da serie temporal
while (julho < 360)
'set t 'julho
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'agosto
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
'set t 'setemb
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'
* avancar para o proximo ano
julho = julho + 12
agosto = agosto + 12
setemb = setemb + 12
endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String Trimestre JAS'
endif

***********************************AGOSTO-SETEMBRO-OUTUBRO***********************************

if (trimestre = "ASO")
say 'Fazer media climatologica de Ago-Set-Out'

* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=8)+sst(t=9)+sst(t=10)'

* qualquer mes>360 marca o fim da serie temporal
while (agosto < 360)

'set t 'agosto
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

'set t 'setemb
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

'set t 'outubr
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

* avancar para o proximo ano
agosto = agosto + 12
setemb = setemb + 12
outubr = outubr + 12

endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String trimestre ASO'
endif

*************************************SETEMBRO-OUTUBRO-NOVEMBRO*******************************

if (trimestre = "SON")
say 'Fazer media climatologica de Set-Out-Nov'

* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=9)+sst(t=10)+sst(t=11)'

* qualquer mes>360 marca o fim da serie temporal
while (setemb < 360)

'set t 'setemb
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

'set t 'outubr
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

'set t 'novemb
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

* avancar para o proximo ano
setemb = setemb + 12
outubr = outubr + 12
novemb = novemb + 12

endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String trimestre SON'
endif

*************************************OUTUBRO-NOVEMBRO-DEZEMBRO****************************

if (trimestre = "OND")
say 'Fazer media climatologica de Out-Nov-Dez'

* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=10)+sst(t=11)+sst(t=12)'
dezemb = dezemb + 12

* qualquer mes>360 marca o fim da serie temporal
while (outubr < 360)

'set t 'outubr
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

'set t 'novemb
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

'set t 'dezemb
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

* avancar para o proximo ano
outubr = outubr + 12
novemb = novemb + 12
dezemb = dezemb + 12

endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String trimestre OND'
endif

***************************************NOVEMBRO-DEZEMBRO-JANEIRO************************

if (trimestre = "NDJ")
say 'Fazer media climatologica de Nov-Dez-Jan'

* primeiro fazer manualmente a soma do ultimo dezembro com os primeiros meses
'define tsmclim = sst(t=359)+sst(t=360)+sst(t=1)'
dezemb = dezemb + 12

* qualquer mes>360 marca o fim da serie temporal
while (novemb < 360)

'set t 'novemb
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

'set t 'dezemb
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

'set t 'janeir
'q time'
tempo = sublin(result,1)
say tempo
'tsmclim = tsmclim + sst'

* avancar para o proximo ano
novemb = novemb + 12
dezemb = dezemb + 12
janeir = janeir + 12

endwhile
* tres meses em trinta anos = 90 elementos fazendo a media
'tsmclim = tsmclim / 90'
'set sdfattr tsmclim String trimestre NDJ'
endif

***************************************************************************************

* preencher atributos extras do arquivo conforme necessário 
'set sdfattr tsmclim String name TSM'
'set sdfattr tsmclim String long_name Temperatura da Superficie do Mar'
'set sdfattr tsmclim String unit K'

* escrever arquivo
'sdfwrite tsmclim'

