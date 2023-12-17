import app from './src/app';
app.listen(process.env.PORT, () => console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}`))