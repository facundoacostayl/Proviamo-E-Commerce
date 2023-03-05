const validShippingInfo = (req, res, next) => {
  //Req body
  const {
    shipping: {
      firstName,
      lastName,
      tel,
      email,
      shippingType,
      addresLine,
      addresNumber,
      floor,
      otherLines,
      city,
      postalCode,
      date,
      branch,
      razonSocial,
      cuit,
      comments,
    },
  } = req.body;

  //Function for validating firstName and lastName with regex
  const validName = (name) => {
    // eslint-disable-next-line
    return /[^a-zA-Z\s]/g.test(name);
  };

  //Requiring paths and validating body data
  if (![tel, email, shippingType, date].every(Boolean)) {
    return res.json("Completa los campos");
  } else if (validName(firstName) || validName(lastName)) {
    return res.status(401).json({ message: "Nombre o apellido inválido" });
  }

  next();
};

module.exports = { validShippingInfo };
