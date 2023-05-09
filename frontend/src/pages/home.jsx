function Home() {
    return (
        <div>
            <h1 className="py-4 text-center gradient col-12 ">Kultorīna</h1>
            <h1 className=" offset-md-2 col-md-8 text-center basictext">Iepazīstināt visu vecumu ieinteresētos ar Latvijas Nacionālās bibliotēkas datu bāzi un izmantot tās pieejamību, kā resursu izglītojošas un ieintrigējošas informācijas iegūšanai jautrā manierē, ko var pildīt dažādās vecuma grupās.</h1>
            <h1 className="py-5 offset-md-2 col-md-8 text-center basictext2">Šim nolūkam tiek pilnveidota un attīstīta Kultorīna - izglītojoša viktorīnas stila spēle.</h1>
            <img src={require("./components/images/klogo.png")} className=" img-fluid my-auto offset-5 col-2"></img>
        </div>
    );
}

export default Home;

