import React, { useState, useEffect }from 'react';
import axios from 'axios';

const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
};

const UpdateMovie = props => {
    const[item, setItem] = useState(initialItem);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setItem(res.data)
                // console.log(res.data)
            })
            .catch(err => console.log('Checking for Errors', err))
    }, [props.match.params.id])

    const changeHandler = event => {
        event.preventDefault(); 
        // event.persist();
        setItem({
            ...item, 
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios   
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, item)
            .then(res => {
                setItem(res.data)
                props.history.push('/')
            })
            .catch(err => console.log(err)
        )
    };

    const handleDelete = e => {
        e.preventDefault();
        axios
            .delete(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                props.setItem(res.data)
                props.history.push(`/`)
                console.lot(res)
            })
            .catch(err => console.log(err.response))
    };

    return(
        <div>
            <h2>Update Movie</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='title'
                        onChange={changeHandler}
                        placeholder='Title'
                        value={item.title}
                        />
                    <input
                        type='text'
                        name='director'
                        onChange={changeHandler}
                        placeholder='Director'
                        value={item.director}
                        />
                    <input
                        type='number'
                        name='metascore'
                        onChange={changeHandler}
                        placeholder='Metascore'
                        value={item.metascore}
                        />
                    <input
                        type='text'
                        name='stars'
                        onChange={changeHandler}
                        placeholder='Stars'
                        value={item.stars}
                        />
                    <button type='submit' onSubmit={handleSubmit}>Update Movie</button>
                    <button className='delete-item' onClick={handleDelete}>Delete</button>
                </form>
        </div>
    );
};

export default UpdateMovie;