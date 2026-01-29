import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export const InfoCard = ({ title, description, icon }: InfoCardProps) => {
  return (
    <div className="group bg-card/40 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
      {icon && (
        <div className="mb-5 h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
    </div>
  );
};
