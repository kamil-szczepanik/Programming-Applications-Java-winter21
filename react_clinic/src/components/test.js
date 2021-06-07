import { useHistory } from "react-router-dom";

const history = useHistory();
async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      alert(e.message);
    }
  }