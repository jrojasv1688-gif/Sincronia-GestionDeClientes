import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const initialClients = [
 {id:1,name:'Ana Rodríguez',email:'ana@example.com',phone:'8888-1234'},
 {id:2,name:'Carlos Méndez',email:'carlos@example.com',phone:'8777-5678'},
 {id:3,name:'María Fernández',email:'maria@example.com',phone:'8666-9012'},
 {id:4,name:'Diego Vargas',email:'diego@example.com',phone:'8555-3456'},
 {id:5,name:'Sofía Jiménez',email:'sofia@example.com',phone:'8444-7890'},
];
const empty = {name:'',email:'',phone:''};
function Icon({type}) {
 const paths={edit:<><path d="m12 4 4 4M3 17l4-1L18 5a2.8 2.8 0 0 0-4-4L3 12v5Z"/></>,trash:<><path d="M3 5h14M7 5V2h6v3M5 5l1 13h8l1-13M8 8v7M12 8v7"/></>,search:<><circle cx="8" cy="8" r="5"/><path d="m12 12 5 5"/></>,plus:<path d="M10 3v14M3 10h14"/>};
 return <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}
function App(){
 const [clients,setClients]=useState(initialClients),[query,setQuery]=useState(''),[form,setForm]=useState(null),[deleting,setDeleting]=useState(null),[notice,setNotice]=useState('');
 const visible=clients.filter(c=>[c.name,c.email,c.phone,String(c.id)].some(v=>v.toLowerCase().includes(query.toLowerCase())));
 function save(e){e.preventDefault(); const values={...form,name:form.name.trim(),email:form.email.trim(),phone:form.phone.trim()};if(!values.name||!values.email||!values.phone)return;setClients(old=>values.id?old.map(c=>c.id===values.id?values:c):[...old,{...values,id:Math.max(0,...old.map(c=>c.id))+1}]);setNotice(values.id?'Cliente actualizado.':'Cliente creado.');setForm(null);}
 return <><header className="topbar"><a className="brand" href="./"><span className="brand-icon">S</span>sincronía<span className="brand-dot">.</span></a><span className="workspace">Gestión de clientes</span><span className="profile" aria-label="Equipo Sincronía">S</span></header>
 <main><div className="breadcrumb">SINCRONÍA <span>/</span> DIRECTORIO</div><section className="page-heading"><div><h1>Clientes</h1><p>La información de tus clientes, en un solo lugar.</p></div><button className="primary" onClick={()=>setForm({...empty})}><Icon type="plus"/>Nuevo cliente</button></section>
 <section className="card" aria-label="Directorio de clientes"><div className="toolbar"><div className="list-title">Todos los clientes <span className="count">{clients.length}</span></div><label className="search"><Icon type="search"/><input aria-label="Buscar clientes" placeholder="Buscar por nombre, correo o teléfono…" value={query} onChange={e=>setQuery(e.target.value)}/></label></div>
 <div className="table-wrap"><table><thead><tr><th>IDENTIFICADOR</th><th>NOMBRE</th><th>CORREO ELECTRÓNICO</th><th>TELÉFONO</th><th className="actions-heading">ACCIONES</th></tr></thead><tbody>{visible.map((c,i)=><tr key={c.id}><td className="identifier">CL-{String(c.id).padStart(3,'0')}</td><td><div className="client-name"><span className={'avatar tone-'+(c.id%3)}>{c.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</span>{c.name}</div></td><td><a href={'mailto:'+c.email}>{c.email}</a></td><td>{c.phone}</td><td><div className="actions"><button className="icon-button" title={'Editar a '+c.name} aria-label={'Editar a '+c.name} onClick={()=>setForm({...c})}><Icon type="edit"/></button><button className="icon-button danger" title={'Eliminar a '+c.name} aria-label={'Eliminar a '+c.name} onClick={()=>setDeleting(c)}><Icon type="trash"/></button></div></td></tr>)}</tbody></table>{visible.length===0&&<div className="empty"><h3>{clients.length?'No encontramos clientes':'Tu directorio está listo para comenzar'}</h3><p>{clients.length?'Probá con otro nombre, correo o teléfono.':'Agregá tu primer cliente con el botón Nuevo cliente.'}</p></div>}</div><footer className="table-footer">Mostrando {visible.length} de {clients.length} clientes <span>Directorio de clientes</span></footer></section>
 <p className="demo-note">Vista de demostración · Los cambios se mantienen mientras esta página esté abierta.</p><div role="status" className="notice">{notice}</div></main>
 {form&&<div className="overlay" onClick={()=>setForm(null)}><section role="dialog" aria-modal="true" aria-labelledby="form-title" className="modal" onClick={e=>e.stopPropagation()} onKeyDown={e=>{if(e.key==='Escape')setForm(null)}}><h2 id="form-title">{form.id?'Editar cliente':'Nuevo cliente'}</h2><p>Completá la información del cliente.</p><form onSubmit={save}>{[['name','Nombre completo','text'],['email','Correo electrónico','email'],['phone','Teléfono','tel']].map(([key,label,type],i)=><label className="field" key={key}>{label}<input autoFocus={i===0} required type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/></label>)}<div className="modal-actions"><button type="button" className="secondary" onClick={()=>setForm(null)}>Cancelar</button><button className="primary" type="submit">Guardar cliente</button></div></form></section></div>}
 {deleting&&<div className="overlay"><section role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description" className="modal"><h2 id="delete-title">¿Eliminar cliente?</h2><p id="delete-description">Se eliminará a {deleting.name} del listado. Esta acción no se puede deshacer.</p><div className="modal-actions"><button autoFocus className="secondary" onClick={()=>setDeleting(null)}>Cancelar</button><button className="delete-button" onClick={()=>{setClients(old=>old.filter(c=>c.id!==deleting.id));setDeleting(null);setNotice('Cliente eliminado.')}}>Eliminar cliente</button></div></section></div>}</>;
}
createRoot(document.getElementById('root')).render(<App/>);
