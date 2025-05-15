let arrayUserNew;
let idcount = 0;
const getUsuariosService = () => {
  arrayUserNew = usuarios;
  idcount = Math.trunc(arrayUserNew[arrayUserNew.length - 1].id);
  arrayUserNew = usuarios.map((usuario) => {
    const rol = roles.find((r) => r.id == usuario.roleId);
    return {
      ...usuario,
      rol: rol ? rol.rol : "",
    };
  });
  return arrayUserNew.reverse();
};

const postUserService = (userObj) => {
  idcount = idcount + 1;
  userObj.id = idcount.toString();
  const res = arrayUserNew.some(
    (e) => e.name == userObj.name && e.surname == userObj.surname
  );
  if (res) {
    return res;
  } else {
    arrayUserNew.push(userObj);
    arrayUserNew = getObjetoUsers();
    console.log(arrayUserNew);
    return arrayUserNew;
  }
};

const deleteUserService = (id) => {
  const res = arrayUserNew.some((e) => e.id == id);
  if (res) {
    arrayUserNew = arrayUserNew.filter((e) => e.id != id);
    arrayUserNew = getObjetoUsers();
    return arrayUserNew;
  } else {
    return arrayUserNew;
  }
};

const deleteSelected = (arrayList) => {
  let ids = [];
  ids = arrayList.map((item) => item.id);
  console.log(ids);
  arrayUserNew = arrayUserNew.filter((item) => !ids.includes(item.id));
  arrayUserNew = getObjetoUsers();
  return arrayUserNew;
};

const putUserService = (userObj) => {
  const res = arrayUserNew.some((e) => e.id == userObj.id);
  if (res) {
    const val = arrayUserNew.some(
      (e) => e.name == userObj.name && e.surname == userObj.surname
    );
    if(val){
      return val;
    }
    arrayUserNew = arrayUserNew.map((usuario) =>
      usuario.id == userObj.id ? { ...usuario, ...userObj } : usuario
    );
    arrayUserNew = getObjetoUsers();
    return arrayUserNew;
  } else {
    return arrayUserNew;
  }
};

//metodo que devuelve el nuevo objeto con la descripcion del rol, validando que los idrol de usuarios y id roles coincidan
const getObjetoUsers = () => {
  arrayUserNew = arrayUserNew.map((usuario) => {
    const rol = roles.find((r) => r.id == usuario.roleId);
    return {
      ...usuario,
      rol: rol ? rol.rol : "",
    };
  });
  return arrayUserNew;
};
