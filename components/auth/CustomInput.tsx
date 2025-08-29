import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { 
  FormControl, 
  FormField, 
  FormLabel, 
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { AuthFormSchema } from '@/lib/utils';
import { z } from 'zod';

const formSchema = AuthFormSchema('sign-in');

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>; // ✅ aquí
  name: FieldPath<z.infer<typeof formSchema>>;       // ✅ asegura que el nombre exista en el schema
  type: string;
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, name, type, label, placeholder }: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}   // react-hook-form espera string
      render={({ field }) => (  
        <div className='form-item'>
          <FormLabel className='form-label'>{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className='input-class'
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className='mt-2 text-red-700'/>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
