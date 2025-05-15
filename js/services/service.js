let arrayUserNew;
let idcount = 0;
const getUsuariosService = () => {
  arrayUserNew = usuarios;
  idcount = Math.trunc(arrayUserNew[arrayUserNew.length - 1].id);
  arrayUserNew = usuarios.map(usuario => {
    const rol = roles.find(r => r.id == usuario.roleId);
    return {
      ...usuario,
      rol: rol ? rol.rol : "Rol no encontrado"
    };
  });
  return arrayUserNew;
};

const postUserService = (userObj) => {
  idcount = idcount + 1;
  userObj.id = idcount;
  arrayUserNew.push(userObj);
  arrayUserNew=getObjetoUsers();
  return arrayUserNew;
};

const deleteUserService = (id) => {
  const res = arrayUserNew.some((e) => e.id == id);
  if (res) {
    arrayUserNew = arrayUserNew.filter((e) => e.id != id);
    arrayUserNew=getObjetoUsers();
    return arrayUserNew;
  } else {
    return arrayUserNew;
  }
};

const putUserService=(userObj)=>{
    const res = arrayUserNew.some((e) => e.id == userObj.id);
    if (res) {
        arrayUserNew = arrayUserNew.map(usuario =>
            usuario.id == userObj.id
              ? { ...usuario, ...userObj } 
              : usuario
        );
        arrayUserNew=getObjetoUsers();
        return arrayUserNew;
      } else {
        return arrayUserNew;
      }
}

//metodo que devuelve el nuevo objeto con la descripcion del rol, validando que los id de usuarios y roles coincidan
const getObjetoUsers=()=>{
    arrayUserNew = arrayUserNew.map(usuario => {
        const rol = roles.find(r => r.id == usuario.roleId);
        return {
          ...usuario,
          rol: rol ? rol.rol : ""
        };
    });
    return arrayUserNew;
}