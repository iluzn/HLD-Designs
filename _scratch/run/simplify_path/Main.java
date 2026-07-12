import java.util.*;

class Solution {
    public String simplifyPath(String s) {
        Deque<String> st = new ArrayDeque<>();
        for (String part : s.split("/")) {
            if (part.isEmpty() || part.equals(".")) continue;
            if (part.equals("..")) { if (!st.isEmpty()) st.pollLast(); }
            else st.addLast(part);
        }
        StringBuilder sb = new StringBuilder();
        for (String p : st) sb.append('/').append(p);
        return sb.length() == 0 ? "/" : sb.toString();
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().simplifyPath(s)).append("\n");}System.out.print(sb);}}