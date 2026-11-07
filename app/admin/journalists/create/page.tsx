import CreateJournalistForm from "../../../components/journalists/create-journalist-form";

export default function CreateJournalistPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Add journalist
      </h1>

      <CreateJournalistForm />
    </div>
  );
}