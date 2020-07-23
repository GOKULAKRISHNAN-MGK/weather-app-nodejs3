const request=require('request')

const forecast = (latitude, longitude, callback)=>{
    url='http://api.weatherstack.com/current?access_key=49ebb00dbc7975cca5cdebfe9e2330be&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect!',undefined)
        }
        else if(body.error){
            callback('Unable to find the location!. Try another search..',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is Currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out.')
        }
    })
}

module.exports=forecast