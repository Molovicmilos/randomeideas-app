import Modal from "./components/Modal";
import IdeaForm from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";
import "./css/style.css";
import "@fortawesome/fontawesome-free/css/all.css";

new Modal();
const ideaForm = new IdeaForm();
ideaForm.render();
new IdeaList();
