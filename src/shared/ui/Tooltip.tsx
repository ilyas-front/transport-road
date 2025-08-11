import React from 'react';
interface TooltipProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
    visible?: boolean;
    position?: {
        x: number;
        y: number;
    };
    className?: string;
}
export const Tooltip: React.FC<TooltipProps> = ({ children, content, visible = false, position, className = '', }) => {
    if (!visible) {
        return <>{children}</>;
    }
    const tooltipStyle = position ? {
        position: 'fixed' as const,
        left: position.x + 10,
        top: position.y - 10,
        zIndex: 1000,
    } : {};
    return (<>
      {children}
      <div className={`rounded  ${className}`} style={tooltipStyle}>
        {content}
      </div>
    </>);
};
