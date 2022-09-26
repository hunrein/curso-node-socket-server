const url =( window.location.hostname.includes('localhost'))
? 'http://localhost:8080/api/auth/' 
: 'https://https://rest-server-hernan-1.herokuapp.com/api/auth/';


let usuario = null;
let socket = null;

// Referencias HTML

const textUid     = document.querySelector('#textUid');
const textMensaje = document.querySelector('#textMensaje');
const ulUsuarios  = document.querySelector('#ulUsuarios');
const ulMensajes  = document.querySelector('#ulMensajes');
const btnSalir    = document.querySelector('#btnSalir');


// Validar el token del localStorage

const validarJWT = async()=>{

    const token = localStorage.getItem('token') || '';

    if( token.length <= 10 ){
        window.location= 'index.html';
        throw new Error('No hay token en el servidor')
    }

    const resp = await fetch( url , {
        headers:{ 'x-token': token}
    });

    const{ usuario: userDB , token:tokenDB }= await resp.json();
    localStorage.setItem('token' , tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async()=>{
    socket = io({
        'extraHeaders':{
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect' , ()=>{
        console.log('Sockets online')
    });
    
    socket.on('disconnect' , ()=>{
        console.log('Sockets offline')
    });
    
    socket.on('recibir-mensajes' , ()=>{
        // TODO
    });
    
    socket.on('usuarios-activos' , (payload)=>{
        console.log(payload);
    });
    
    socket.on('mensaje-privado' , ()=>{
        // TODO
    });
    

}




const main = async()=>{

    await validarJWT();
}




main();
//