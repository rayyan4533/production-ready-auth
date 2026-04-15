import 'dotenv/config';
import app from "./src/app.js";
const PORT = process.env.PORT;
const start = async () => {
    app.listen(PORT, () => {
        console.log(`server is running at ${PORT}`);
    });
};
start().catch((error) => {
    console.log("nahi chalraha bro");
    process.exit(1);
});
//# sourceMappingURL=server.js.map