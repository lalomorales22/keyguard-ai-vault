
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  Edit, 
  Trash2, 
  ExternalLink 
} from 'lucide-react';
import { useApp, ApiKey } from '@/context/AppContext';
import ApiKeyForm from './ApiKeyForm';

interface ApiKeyCardProps {
  apiKey: ApiKey;
}

const ApiKeyCard = ({ apiKey }: ApiKeyCardProps) => {
  const { deleteApiKey, copyApiKey, copyExportCommand, categories } = useApp();
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Find the category name for this API key
  const categoryName = categories.find(cat => cat.id === apiKey.categoryId)?.name || 'Uncategorized';
  
  // Format the key to show only first and last few characters
  const formatKey = (key: string) => {
    if (!key) return '';
    if (showKey) return key;
    
    if (key.length <= 8) {
      return '••••••••';
    }
    
    return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
  };

  if (isEditing) {
    return (
      <div className="api-card overflow-hidden">
        <ApiKeyForm 
          initialData={apiKey} 
          onSubmit={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
          isEditing={true}
        />
      </div>
    );
  }

  return (
    <div className="api-card space-y-1 text-xs p-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xs font-semibold">{apiKey.displayName}</h3>
          <p className="text-[10px] text-white/60">{apiKey.name}</p>
          <div className="text-[10px] text-brand-purple">{categoryName}</div>
        </div>
        
        <div className="flex space-x-0.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="h-5 w-5 rounded-full hover:bg-white/10"
          >
            <Edit className="h-2.5 w-2.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteApiKey(apiKey.id)}
            className="h-5 w-5 rounded-full hover:bg-white/10 hover:text-red-400"
          >
            <Trash2 className="h-2.5 w-2.5" />
          </Button>
        </div>
      </div>
      
      <div className="border border-white/10 rounded-md p-1.5 bg-white/5">
        <div className="flex justify-between items-center">
          <code className="text-[10px] text-brand-light font-mono break-all">
            {formatKey(apiKey.key)}
          </code>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowKey(!showKey)}
            className="ml-1 h-4 w-4 shrink-0"
          >
            <span className="sr-only">{showKey ? 'Hide' : 'Show'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-2.5 h-2.5"
            >
              {showKey ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
              )}
            </svg>
          </Button>
        </div>
      </div>
      
      <div className="flex pt-1 border-t border-white/10 justify-between">
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyApiKey(apiKey.key)}
            className="text-[10px] h-5 border-white/10 hover:bg-white/10 px-1.5"
          >
            <Copy className="h-2 w-2 mr-1" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyExportCommand(apiKey.name, apiKey.key)}
            className="text-[10px] h-5 border-white/10 hover:bg-white/10 px-1.5"
          >
            <Copy className="h-2 w-2 mr-1" />
            Export
          </Button>
        </div>
        
        {apiKey.url && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(apiKey.url, '_blank')}
            className="text-[10px] h-5 px-1.5"
          >
            <ExternalLink className="h-2 w-2 mr-1" />
            Docs
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApiKeyCard;
