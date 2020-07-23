const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//set up handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Gokulakrishnan M'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Weather app',
        name: 'Gokulakrishnan M'
    }) 
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Gokulakrishnan M',
        email: 'help@email.com',
        tollFreeNumber: '1800800800'
    })
})  

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'address is empty'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
})
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'search is empty'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Gokulakrishnan M',
        errorMessage: 'Requested help article not found'
    })
})
app.get('/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Gokulakrishnan M',
        errorMessage: 'Page not Found'
    })
})

app.listen(port,()=>{
    console.log('Server is up and Running at port '+port)
})