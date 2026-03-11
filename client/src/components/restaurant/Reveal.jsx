import { useEffect } from "react";

export const Reveal = ({ children, className = "", as: Tag = "div", ...props }) => {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.16 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <Tag className={`reveal ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
};
