'use client'
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FilmSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Tytuł musi mieć co najmniej 2 znaki')
        .required('Pole wymagane'),
    year: Yup.number()
        .integer('Rok musi być liczbą całkowitą')
        .min(1888, 'Najstarszy film powstał w 1888 roku')
        .max(2030, 'Maksymalny rok to 2030')
        .required('Pole wymagane'),
    genre: Yup.string()
        .required('Pole wymagane'),
});

export default function AddFilmPage() {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            title: '',
            year: 2024,
            genre: '',
        },
        validationSchema: FilmSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('/api/filmy', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    router.push('/filmy');
                } else {
                    const errorData = await response.json();
                    alert(`Błąd: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Submission error:', error);
            }
        },
    });

    return (
        <div>
            <h1>Dodaj Nowy Film</h1>

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Tytuł</label>
                    <input
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div>{formik.errors.title}</div>
                    )}
                </div>

                <div>
                    <label>Rok produkcji</label>
                    <input
                        name="year"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.year}
                    />
                    {formik.touched.year && formik.errors.year && (
                        <div>{formik.errors.year}</div>
                    )}
                </div>

                <div>
                    <label>Gatunek</label>
                    <input
                        name="genre"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.genre}
                    />
                    {formik.touched.genre && formik.errors.genre && (
                        <div>{formik.errors.genre}</div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? 'Dodawanie...' : 'Zapisz Film'}
                </button>
            </form>
        </div>
    );
}
