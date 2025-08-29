import { Control, FieldValues } from 'react-hook-form';
import { 
  FormControl, 
  FormField, 
  FormLabel, 
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { AuthFormSchema } from '@/lib/utils';
import { z } from 'zod';

type AuthFormValues = z.infer<typeof AuthFormSchema>;

interface CustomInputProps {
  control: Control<AuthFormValues>; // ✅ aquí
  name: keyof AuthFormValues;       // ✅ asegura que el nombre exista en el schema
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
            <FormMessage className='mt-2'/>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
