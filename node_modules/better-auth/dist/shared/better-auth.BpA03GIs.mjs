const deviceAuthorizationClient = () => {
  return {
    id: "device-authorization",
    $InferServerPlugin: {},
    pathMethods: {
      "/device/code": "POST",
      "/device/token": "POST",
      "/device": "GET",
      "/device/approve": "POST",
      "/device/deny": "POST"
    }
  };
};

export { deviceAuthorizationClient as d };
