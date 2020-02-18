

module.exports = (errorCode, req, res, next) => {
  let message;
  switch(errorCode){
    case 400:{
      message='It is necessary more parameters'
    }
    case 401:{
      message='Element expired';
      break;
    }
    case 404:{
      message='This element not found';
      break;
    }
    case 500:{
      message='Internal error';
      break;
    }
    default:{

    }
  }
  res.status(errorCode).json({
      message: message
    });
  };