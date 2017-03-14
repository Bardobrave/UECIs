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
            var sqlSolicitante = "SELECT PERSON.DBOID "
                + "FROM TIL_EXP_EXPEDIENTES E, TIL_EXP_PERSON_REL P, TIL_EXP_TIPOS_PERSON_REL TP, PERSON "
                + "WHERE P.exp_expedientes_id = E.Dboid AND TP.dboid = P.EXP_TIPOS_PERSON_REL_ID "
                + "AND PERSON.dboid = P.PERSON AND E.dboid = '" + idExpediente + "' "
                + "AND TP.codigo = 'INTERESADO' AND rownum = 1";
      	    this.datpar.getAlmacen().ejecutarSQL(sqlSolicitante, function(res) {
                if (res.numElementos() > 0) {
                    //Tenemos ubicado al miembro, vamos a buscarlo en las UECIs y recuperar los datos de la UECI que se correspondan
                    //con la fecha de registro del documento
                    var sqlUECI = "SELECT U.dboid FROM FWK_DPA_UECIS U, FWK_DPA_MIEMBROS M "
                        + "WHERE U.dboid = M.elemento_padre_id AND M.persona = '" + res.get(0).get('PERSON.DBOID') + "' ";
                    this.datpar.getAlmacen().ejecutarSQL(sqlUECI, function(res) {
                        if (res.numElementos() > 0)
                            alert(res.get(0).get("U.dboid"));
                    });
                }
            });
        }
    }
}();
