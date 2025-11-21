import { useState } from "react";

const useForm = (initial_state, onSubmit) => {
    const [form_state, setFormState] = useState(initial_state);

    function onInputChange(e) {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(form_state);
    }

    function resetForm() {
        setFormState(initial_state);
    }

    return { form_state, onInputChange, handleSubmit, resetForm };
};

export default useForm;
