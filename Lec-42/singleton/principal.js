class Principal{
    multipleSchool=new Map();
    instance=null;
    principal=null;
    _constructor(name){
        this.principal=name;
    }
    static getPrincipal(school){
        if(!instance){
            let principal=new Principal();
            multipleSchool.set(school,principal);
            // instance=principal;
        }
        return multipleSchool.get(school);
    }
    createCurriculam(){

    }
    resticateStudents(){

    }
    suspendStudent(days){

    }
    notify(message){

    }

}
module.exports=Principal;