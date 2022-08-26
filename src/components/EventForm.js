import React, {useState,useEffect} from 'react';
import {db} from '../firebase'
import { doc, getDoc } from "firebase/firestore";
import {toast} from 'react-toastify'



const UserForm = (props) => {

    const intialStateValues ={
        email :'',
        emailConfirn :'',
        name :'',
        lastName :'',
        DNI :'',
        phone :'',
        postalCode :''
    };

    const [values, setValues] = useState(intialStateValues);
    
    const handleInputChange =e =>{
        //console.log(e.target.value)

        const {name,value} = e.target
        //console.log(name,value)
        setValues({...values,[name]:value})//establecer valores iniales, alterar la propiedad, con el valor
    }

    //funciones para validar
    const validateEmail= str => {// validate email regex javascript
        var re = /\S+@\S+\.\S+/;
        return re.test(str);
    }
    //enviar formulario
    const handleSubmit = e => {
        e.preventDefault();
        //console.log(values);
        //console.log("es la validacion-->>>>>",validateEmail(values.email))
        if(!validateEmail(values.email)){
            return toast('Email invalido',{
                type:'warning',
                autoClose:1000,
            })
        }

        props.addOrEditUser(values);
        setValues({...intialStateValues})

    }
    const getUserById = async(id) => {
        const docRef = doc(db, "Users",id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        setValues({...docSnap.data()})
    }
    //control de crear o edit
    useEffect(()=>{
        if(props.currentId === ''){
            setValues({...intialStateValues});
        }else{
            console.log(props.currentId)
            getUserById(props.currentId)
        }

    },[props.currentId])// se ejecutas cuando pasamos esta variable

    return (
        <form className='card card-body' onSubmit={handleSubmit}>
            <div className='form-group input-group pb-4'>
                <div className='input-group-text bg-light'>
                </div>
                <input type="text" className='form-control ' placeholder='E-mail' name='email' onChange={handleInputChange} value={values.email} />
            </div>
            <div className='form-group input-group pb-4'>
                <div className='input-group-text bg-light'>
                </div>
                <input type="text" className='form-control' placeholder='Confirmar e-mail' name='emailConfirn' onChange={handleInputChange} value={values.emailConfirn}/>
            </div>
            <div className='form-group input-group pb-4'>
                <div className='input-group-text bg-light'>
                </div>
                <input type="text" className='form-control' placeholder='Nombre' name='name' onChange={handleInputChange} value={values.name}/>
            </div>
            <div className='form-group input-group pb-4'>
                <div className='input-group-text bg-light'>
                </div>
                <input type="text" className='form-control' placeholder='Apellidos' name='lastName' onChange={handleInputChange} value={values.lastName}/>
            </div>
            <div className='form-group input-group pb-4'>
                <div className='input-group-text bg-light'>
                </div>
                <input type="text" className='form-control' placeholder='DNI' name='DNI' onChange={handleInputChange} value={values.DNI}/>
            </div>
            <div className='form-group input-group pb-4'>
                <div className='input-group-text bg-light'>
                </div>
                <input type="text" className='form-control' placeholder='Teléfono' name='phone' onChange={handleInputChange} value={values.phone}/>
            </div>
            <div className='form-group input-group pb-4'>
                <div className='input-group-text bg-light'>
                </div>
                <input type="text" className='form-control' placeholder='Código postal' name='postalCode' onChange={handleInputChange} value={values.postalCode}/>
            </div>
            <div className='pb-2'>
                Con la compra aceptas la <a href="http://">  normativa referente al Covid-19</a>
            </div>
            <button className='btn btn-primary'>
                {props.currentId===''? 'Guardar':'Update'}
                
            </button>

        </form>
    )
}

export default UserForm;