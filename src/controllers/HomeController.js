module.exports = class HomeController {
    static async HomeRouteGetController(req, res, next) {
        try {
            res.json({
                ok: true,
            });
        } catch (error) {
            next(error);
        }
    }
}