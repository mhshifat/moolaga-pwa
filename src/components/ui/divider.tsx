interface DividerProps {
  vertical?: boolean;
}

export default function Divider({ vertical }: DividerProps) {
  return (
    <div className="w-full border-t border-border h-[1px]" />
  )
}