import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";


@NgModule({
    imports: [ReactiveFormsModule, FormsModule],
    exports: [ReactiveFormsModule, FormsModule]
})
export class SharedModule {}