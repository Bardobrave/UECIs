var UECI = function () {
    //Estructura interna de datos
    var INGRESO = {
        nombreIngreso: "",
        esIngresoRegular: false,
        fechaInicioPercepcion: "",
        fechaFinPercepcion: "",
        importe: 0
    }
    
    var MIEMBRO = {
        nif: "",
        nombre: "",
        apellidos: "",
        sexo: "",
        fechaNacimiento: "",
        esResponsable: false,
        relacionParentescoResponsable: "",
        nacionalidad: "",
        fechaEmpadronamientoGijon: "",
        porcentajeDiscapacidad: 0,
        esDependiente: false,
        estadoCivil: "",
        observaciones: "",
        ingresos: []
    }
    
    this.data = {
        fechaConformacion: "",
        tipoFamilia: "",
        tipoVivienda: "",
        observaciones: "",
        miembros: []
    }
    
    return { //modelo que se hace público al importar en un fichero .js
        loadDataUECI: function(idExpediente) {
            var sqlSolicitante = "SELECT PERSON.IDNUMBER || PERSON.CTRLDIGIT "
                + "FROM TIL_EXP_EXPEDIENTES E, TIL_EXP_PERSON_REL P, TIL_EXP_TIPOS_PERSON_REL TP, PERSON "
                + "WHERE P.exp_expedientes_id = E.Dboid "
                + "AND TP.dboid = P.EXP_TIPOS_PERSON_REL_ID "
                + "AND PERSON.dboid = P.PERSON "
                + "AND E.dboid = '" + idExpediente + "' "
                + "AND TP.codigo = 'INTERESADO' "
                + "AND rownum = 1";
      	    this.datpar.getAlmacen().ejecutarSQL(sqlSolicitante, function(res) {
                if (res.numElementos() > 0) {
                    alert(res.get(0).get('PERSON.IDNUMBER||PERSON.CTRLDIGIT'));
                }
            });
        }
    }
}();
