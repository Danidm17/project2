module.exports = app => {

    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const authRoutes = require("./auth.routes");
    app.use("/", authRoutes);

    const roomRoutes = require("./room.routes");
    app.use("/", roomRoutes);

    const userRoutes = require("./user.routes");
    app.use("/", userRoutes);

    const apiRoutes = require("./api.routes");
    app.use("/api", apiRoutes);

    const contactRoutes = require("./contact.routes");
    app.use("/", contactRoutes);
}