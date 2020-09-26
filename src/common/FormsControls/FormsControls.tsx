import React from 'react';
import styles from './FormsControls.module.css'

/*type TextareaPropsType = {
    input: any
    meta: any
}*/


export const FormControl = ({input, meta, ...props}: any) => {
    const hasError = meta.touched &&  meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {props.children}
            </div>
            { hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, child, ...restprops} = props
   return <FormControl {...props}><textarea {...input} {...restprops}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, child, ...restprops} = props
    return <FormControl {...props}><input {...input} {...restprops}/></FormControl>
}