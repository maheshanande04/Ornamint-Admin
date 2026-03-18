import { AbstractControl } from "@angular/forms";

export function passwordMatch(password:any, cpassword:any){

     return function(form:AbstractControl){
        const passwordvalue =  form.get(password)?.value
        const confirmpasswordvalue =  form.get(cpassword)?.value
        console.log(passwordvalue);
        console.log(confirmpasswordvalue);

        if(passwordvalue === confirmpasswordvalue){
            return null;
        }
        return{ passwordMismatchError:true}
        
    }
}