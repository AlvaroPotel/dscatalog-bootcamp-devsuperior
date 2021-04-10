import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name:string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price:'',
        category:'1',
        description:''
    });

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        console.log({name, value});
        setFormData(data => ({...data, [name]:value}));
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
          ...formData,
          imgUrl:'https://bordalo.observador.pt/v2/rs:fill:900/c:433:433:nowe:0:0/q:86/plain/https://s3.observador.pt/wp-content/uploads/2020/02/25151553/xbox-scarlett_heroandwire-logo-longbullets_433x433_acf_cropped.jpg',  
          categories: [{id: formData.category}]
        }

        console.log(payload);
        makeRequest({url:'/products', method:'POST', data:payload }).then(()=> {
            setFormData({ name:'', category:'', price:'', description:''})
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                        <div className="col-6">
                            <input 
                                value={formData.name}
                                name="name"
                                type="text" 
                                className="form-control mb-5" 
                                onChange={handleOnChange}
                                placeholder="Nome do Produto"
                            />
                            <select 
                                    value={formData.category}
                                    className="form-control mb-5" 
                                    onChange={handleOnChange}
                                    name="category">
                                <option value="1">Livros</option>
                                <option value="3">Computadores</option>
                                <option value="2">Eletronicos</option>
                                
                            </select>
                            <input 
                                value={formData.price}
                                name="price"
                                type="text" 
                                className="form-control" 
                                onChange={handleOnChange}
                                placeholder="Preço"
                            />
                        </div>
                        <div className="col-6">
                            <textarea 
                                name="" 
                                onChange={handleOnChange} 
                                cols={30} 
                                className="form-control"
                                rows={10}/>
                        
                        </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;