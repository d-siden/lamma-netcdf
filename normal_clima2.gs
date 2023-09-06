* preguica de usar o clave do kodama, entao inventei o meu
* se eu estiver errado alguem me corrija, pelo amor de Deus

'reinit'

* dados de entrada
* climatologia de dezembro a fevereiro de 1966 a 1995, dados mensais
'sdfopen /home/danilo/Documentos/R/nino/era5/TSM_1966_1995.nc'
* nome da var no arquivo = sst

tempos = 1
'set t 'tempos

* criar variavel de saida
'define tsmclim = sst'

* definir atributos e nome do arquivo de saida
'set sdfwrite -4d -rt -flt -nc4 /home/danilo/Documentos/R/nino/climatologia_TSM_66-95.nc'

* se o conjunto de dados eh mensal e tem 30 anos entao sao 360 tempos
while (tempos < 361)
'set t 'tempos
'q time'
atual = sublin(result,1)
say atual
'tsmclim = tsmclim + sst'
* avancar para o proximo mes
tempos = tempos + 1
endwhile
'tsmclim = tsmclim / 360'

'set sdfattr tsmclim String periodo 1966-1995'

***************************************************************************************
* preencher atributos extras do arquivo conforme necessário 
'set sdfattr tsmclim String name TSM'
'set sdfattr tsmclim String long_name Temperatura da Superficie do Mar'
'set sdfattr tsmclim String unit K'
* escrever arquivo
'sdfwrite tsmclim'

