import logo from '../assets/LR PLATINUM TYRES.png';

import logo3 from '../assets/Screenshot 2024-07-09 at 20.45.08 1.png';

const Hero = () => {
  return (
    <div>
      <div className="hero py-5 mb-5 text-center text-white" style={{ backgroundColor: '#000000', width: '100%', height: '700px' }}>
        <img className="d-block mx-auto my-5" src={logo} alt="LR Platinum Tyres Logo" width="900" height="250" />
        <div className="desc row mx-auto align-items-center" style={{ height: '168px', width: '100%', backgroundColor: '#FF0000' }}>
          <div className="col-md-4 d-flex justify-content-center">
            
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <img src={logo3} alt="Logo 3" style={{ maxHeight: '150px', objectFit: 'contain' }} />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
