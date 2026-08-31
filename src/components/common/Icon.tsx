import { useEffect, useState } from "react";

type IconProps = {
  id: string;
  color?: string;
  className?: string;
};

const iconCache = new Map<string, React.FC<any> | null>();

export default function Icon({ id, color, className }: IconProps) {
  const [IconComponent, setIconComponent] = useState<React.FC<any> | null>(
    () => iconCache.get(id) ?? null
  );

  useEffect(() => {
    if (iconCache.has(id)) return;

    import(`../../assets/icons/${id}.svg?react`)
      .then((mod) => {
        const Comp = mod.default as React.FC<any>;
        iconCache.set(id, Comp);
        setIconComponent(() => Comp);
      })
      .catch(() => {
        console.warn(`Icon "${id}" not found`);
        iconCache.set(id, null);
        setIconComponent(null);
      });
  }, [id]);

  if (!IconComponent) return null;

  return <IconComponent style={{ color }} className={className} />;
}
