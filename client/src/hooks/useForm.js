// write your custom hook here to control your checkout form
import { useLocalStorage } from "./useLocalStorage";

export const useForm = (key, initialValue, cb) => {
  const [values, setValues] = useLocalStorage(key, initialValue);
  const handleChanges = (event) => {
    console.log(event.target.name);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const clearForm = () => {
    // event.preventDefault();
    setValues(initialValue);
  };
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     cb();
  //   };
  return [values, handleChanges, clearForm];
};
