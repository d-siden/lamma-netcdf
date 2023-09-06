import cdsapi

# informe o primeiro e o ultimo ano da normal
primeiro, ultimo = 1981, 2010

#['1966', '1973', '1983', '1988', '1992', '1998']

"""
ERA5: dados a partir de 1940
normais utilizadas no ONI de acordo com: https://origin.cpc.ncep.noaa.gov/products/analysis_monitoring/ensostuff/ONI_change.shtml

1936-1965
41-70
46-75
51-80
56-85
61-90
66-95
71-00
76-05
81-10
86-15
91-20
"""
#########################################################################################

c = cdsapi.Client()

normal = list(range(primeiro, ultimo+1))

# converter em string
for A in list(range(0,len(normal))):
	normal[A] = str(normal[A])

print("Baixar TSM de "+str(primeiro)+" a "+str(ultimo))

c.retrieve(
    'reanalysis-era5-single-levels-monthly-means',
    {
        'format': 'netcdf',
        'product_type': 'monthly_averaged_reanalysis',
        'variable': 'sea_surface_temperature',
        'year': normal,
        'month': [
            '01', '02', '03',
            '04', '05', '06',
            '07', '08', '09',
            '10', '11', '12',
        ],
        'time': '00:00',
    },
    'TSM_'+str(primeiro)+'_'+str(ultimo)+'.nc')
    
