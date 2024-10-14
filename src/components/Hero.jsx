
import logo from '../assets/LR PLATINUM TYRES.png';
import logo2 from '../assets/IMG_5295 2.png';
import logo3 from '../assets/Screenshot 2024-07-09 at 20.45.08 1.png';

const Hero = () => {
  return (
    <div>
      <div className="hero py-5 mb-5 text-center text-white" style={{ backgroundColor: '#000000', width: '100%', height: '700px' }}>
        <img className="d-block mx-auto my-5" src={logo} alt="" width="900" height="250" />
          <div className="desc row" style={{ height: '168px', width: '100%', backgroundColor: '#FF0000' }}>
            <div className="col-md-4"><img src={logo2} alt="" style={{marginTop: '-15px'}} /></div>
            <div className="col-md-4"><img src={logo3} alt="" /></div>
            <div className="col-md-4"></div>
          </div>
          {/* <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p> */}

      </div>
    </div>
  );
}

export default Hero;
