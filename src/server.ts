// Gal-Peer-322225848-Ariel-Angel-324976976
import intApp from "./index";
const PORT = process.env.PORT;

intApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
