import { prisma } from "@/lib/db"; import type { Class } from "@prisma/client";
export default async function Dashboard({params}:{params:{tenant:string}}){
  const tenant = await prisma.tenant.findUnique({ where: { slug: params.tenant } });
  if(!tenant) return <div className="p-6">Tenant introuvable.</div>;
  const classes: Class[] = await prisma.class.findMany({ where: { tenantId: tenant.id } });
  return (<div className="p-6"><h1 className="text-2xl font-semibold">Tableau de bord — {tenant.name}</h1><div className="mt-4"><h2 className="font-medium">Classes ({classes.length})</h2><ul className="list-disc ml-6">{classes.map(c=><li key={c.id}>{c.name}</li>)}</ul></div></div>);
}
