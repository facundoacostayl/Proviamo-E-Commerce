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
      solicitaFactura,
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

  //Function for validating loginEmail with regex
  const validEmail = (email) => {
    // eslint-disable-next-line
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  //Requiring paths and validating body data
  if (![tel, email, shippingType].every(Boolean)) {
    return res.json("Completa los campos requeridos");
  } else if (!validEmail(email)) {
    return res.json("Ingresa un email válido");
  }

  //IF FIRSTNAME OR LASTNAME EXISTS, VALIDATE THEM
  if (firstName || lastName) {
    if (!validName(firstName) || !validName(lastName)) {
      return res.status(401).json({ message: "Nombre o apellido inválido" });
    }
  }

  //VALIDATE "Retira en sucursal" if it was selected
  if (shippingType === "Retira en sucursal") {
    if (![date, branch].every(Boolean)) {
      return res.json("Completa los datos de retiro");
    }
  }

  //VALIDATE "Envio a domicilio" if it was selected
  if (shippingType === "Envío a domicilio") {
    if (![date, addresLine, addresNumber, city, postalCode].every(Boolean))
      return res.json("Completa los datos de envío");
  }

  //VALIDATE "solicitaFactura" if it was selected
  if (solicitaFactura) {
    if (![razonSocial, cuit].every(Boolean))
      return res.json("Completa los datos de factura");
  }

  next();
};

module.exports = { validShippingInfo };
