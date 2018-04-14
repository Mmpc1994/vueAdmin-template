import 'reflect-metadata';

export default function(options: any) {
  return Reflect.metadata('options', options)
}