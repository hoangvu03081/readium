from transformers import pipeline

def create_model():
    return pipeline("summarization", model ='sshleifer/distilbart-cnn-12-6')

def create_chunk(text):
    max_chunk = 500
    text = text.replace('.', '.<eos>')
    text = text.replace('!', '.<eos>')
    text = text.replace('?', '?<eos>')
    
    sentences = text.split('<eos>')
    current_chunk = 0
    chunks = []
    for sentence in sentences:
        if len(chunks) == current_chunk + 1:
            if len(chunks[current_chunk]) + len(sentence.split(' ')) <= max_chunk:
                chunks[current_chunk].extend(sentence.split(' '))
            else:
                current_chunk += 1
                chunks.append(sentence.split(' '))
        else:
            chunks.append(sentence.split(' '))

    for chunk_id in range(len(chunks)):
        chunks[chunk_id] = ' '.join(chunks[chunk_id])

    return chunks
    

def summarize(model,text):
    chunks = create_chunk(text)
    result = model(chunks, max_length=120, min_length=30, do_sample=False)

    return ' '.join([s['summary_text'] for s in result])