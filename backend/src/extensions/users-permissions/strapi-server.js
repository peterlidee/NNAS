const _ = require("lodash");
const utils = require("@strapi/utils");
const { ApplicationError, ValidationError } = utils.errors;

module.exports = (plugin) => {
  // *** custom controller ***
  plugin.controllers.user.updateMe = async (ctx) => {
    // needs to be logged in
    if (!ctx.state.user || !ctx.state.user.id) {
      throw new ApplicationError("You need to be logged");
    }

    // don't let request without username through
    if (
      !_.has(ctx.request.body, "username") ||
      ctx.request.body.username === ""
    ) {
      throw new ValidationError("Invalid data");
    }

    // only allow request with allowedProps
    const allowedProperties = ["username"];
    const bodyKeys = Object.keys(ctx.request.body);
    if (bodyKeys.filter((key) => !allowedProperties.includes(key)).length > 0) {
      // return (ctx.response.status = 400);
      throw new ValidationError("Invalid data");
    }

    // sanitize fields (a bit)
    const newBody = {};
    bodyKeys.map(
      (key) =>
        (newBody[key] = ctx.request.body[key].trim().replace(/[<>]/g, ""))
    );

    // don't let user chose username already in use!!!!
    // can't get this to work case insensitive
    if (_.has(ctx.request.body, "username")) {
      const userWithSameUsername = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { username: ctx.request.body.username } });
      if (
        userWithSameUsername &&
        _.toString(userWithSameUsername.id) !== _.toString(ctx.state.user.id)
      ) {
        throw new ApplicationError("Username already taken");
      }
    }

    // do the actual update and return update name
    await strapi
      .query("plugin::users-permissions.user")
      .update({
        where: { id: ctx.state.user.id },
        data: newBody,
      })
      .then((res) => {
        ctx.response.body = { username: res.username };
        ctx.response.status = 200;
      });
  };

  // *** custom route ***
  plugin.routes["content-api"].routes.push({
    method: "PUT",
    path: "/user/me",
    handler: "user.updateMe",
    config: {
      prefix: "",
      policies: [],
    },
  });

  return plugin;
};
