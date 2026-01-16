
import re

file_path = r"c:\Users\Cetpa\AppData\Local\Temp\zencoder\pasted\files\20260115071112-uazr34.txt"

def parse_questions():
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    questions = []
    current_section = None
    current_q = None
    
    # State machine
    # sections: 'array', 'operators1', 'operators2'
    
    start_id = 139
    
    section_map = {
        'JavaScript Numbers + Strings in Array': 'array',
        'JavaScript + Operator with Number & String': 'operators',
        '20 More Output-Based Questions with Reasons': 'operators'
    }

    iterator = iter(enumerate(lines))
    
    buffer_code = []
    buffer_output = []
    buffer_reason = []
    
    state = 'IDLE' # IDLE, IN_SECTION, IN_QUESTION, IN_OUTPUT
    
    processed_questions = []

    def save_question(q_num, category, code, output, reason):
        nonlocal start_id
        
        # Clean up code
        code_str = "".join(code).strip()
        output_str = "".join(output).strip()
        reason_str = "".join(reason).strip()
        
        if not reason_str:
            reason_str = "Check output for details."
            
        level_str = f"Level {q_num}" if category == 'array' else f"Op Q{q_num}"
        diff = "Medium"
        if category == 'operators':
            diff = "Easy" if len(code_str) < 30 else "Hard"
            
        title = f"{category.capitalize()} Q{q_num}"
        
        q_obj = {
            "id": start_id,
            "category": category,
            "level": level_str,
            "difficulty": diff,
            "question": title,
            "code": code_str,
            "output": output_str,
            "explanation": reason_str
        }
        processed_questions.append(q_obj)
        start_id += 1

    section_regex = re.compile(r"JavaScript Numbers \+ Strings in Array|JavaScript \+ Operator with Number & String|20 (More )?Output-Based Questions with Reasons")
    q_regex = re.compile(r"^Q(\d+)$")
    
    cat = 'array'

    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Check for section start
        if "JavaScript Numbers + Strings in Array" in line:
            cat = 'array'
            state = 'IN_SECTION'
            i += 1
            continue
        elif "JavaScript + Operator with Number & String" in line:
            cat = 'operators'
            state = 'IN_SECTION'
            i += 1
            continue
        elif "20 More Output-Based Questions with Reasons" in line or "20 Output-Based Questions with Reasons" in line:
            cat = 'operators' # continued
            state = 'IN_SECTION'
            i += 1
            continue
            
        if state == 'IDLE':
            i += 1
            continue
            
        # Match Qn
        m = q_regex.match(line)
        if m:
            # If we were processing a question, save it
            if current_q is not None:
                save_question(current_q, cat, buffer_code, buffer_output, buffer_reason)
            
            current_q = int(m.group(1))
            buffer_code = []
            buffer_output = []
            buffer_reason = []
            
            # Read code until Output:
            state = 'READ_CODE'
            i += 1
            continue
            
        if state == 'READ_CODE':
            if line.startswith("Output:"):
                state = 'READ_OUTPUT'
                # Extract inline output if present? Usually it's on next line or same line
                val = line.replace("Output:", "").strip()
                if val:
                    buffer_output.append(val)
            else:
                buffer_code.append(lines[i]) # Keep raw line with indentation
            i += 1
            continue
            
        if state == 'READ_OUTPUT':
            # Read output until empty line or Reason: or next Q
            if line.startswith("Reason:"):
                state = 'READ_REASON'
                buffer_reason.append(line.replace("Reason:", "").strip())
            elif q_regex.match(line) or section_regex.search(line):
                # End of question, next one starts or section change
                # Don't increment i, let loop handle it
                # Save current
                pass # loop will handle save at start of next Q match
            elif line == "":
                 # Empty line might end output, or be part of it?
                 # Usually questions are separated by empty lines.
                 # If next line is Q or Section, we are done.
                 pass
            else:
                 buffer_output.append(line)
            i += 1
            continue
            
        if state == 'READ_REASON':
            if q_regex.match(line) or section_regex.search(line):
                pass
            elif line == "":
                pass
            else:
                buffer_reason.append(line)
            i += 1
            continue

    # Save last
    if current_q is not None:
        save_question(current_q, cat, buffer_code, buffer_output, buffer_reason)

    # Generate JS output
    print("const newQuestions = [")
    for q in processed_questions:
        print(f"  {{")
        print(f"    id: {q['id']},")
        print(f"    category: \"{q['category']}\",")
        print(f"    level: \"{q['level']}\",")
        print(f"    difficulty: \"{q['difficulty']}\",")
        print(f"    question: \"{q['question']}\",")
        print(f"    code: `{q['code']}`,")
        print(f"    output: `{q['output']}`,")
        print(f"    explanation: `{q['explanation']}`,")
        print(f"  }},")
    print("];")

parse_questions()
