import { Switch } from '@headlessui/react'

export default function SimpleSwitch({
    enabled, 
    setEnabled = () => {},
    onClick = () => {}
}) {

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      onClick={onClick}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10 border border-black dark:border-none"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-gray-300 ring-0 shadow-xl transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
      />
    </Switch>
  )
}
